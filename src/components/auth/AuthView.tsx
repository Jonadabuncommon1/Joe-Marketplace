import React, { useState, useEffect } from 'react';
import { auth } from '../../lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { AlertCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
import toast from 'react-hot-toast';
import { logVisitorSignIn, requestNotificationPermission } from '../../lib/visitorTracking';
import { PrivacyView } from '../home/PrivacyView';
import { TermsView } from '../home/TermsView';
import { LogoMark } from '../brand/Logo';

/**
 * Labeled field, matching the plain "label above input" method (flofmart.com/auth/signup).
 */
const Field: React.FC<{
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
  showToggle?: boolean;
  showValue?: boolean;
  onToggleShow?: () => void;
  autoComplete?: string;
}> = ({ label, type = 'text', value, onChange, placeholder, required = true, showToggle, showValue, onToggleShow, autoComplete }) => (
  <div>
    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-jt-ink dark:text-white">
      {label}
    </label>
    <div className="relative">
      <input
        type={showToggle ? (showValue ? 'text' : 'password') : type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-jt-ink/15 bg-jt-paper px-4 py-3 text-sm font-medium text-jt-ink outline-none transition-colors placeholder:font-normal placeholder:text-jt-ink/40 focus:border-jt-blue focus:ring-2 focus:ring-jt-blue/20 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-jt-ink/50 transition-colors hover:text-jt-blue dark:text-white/50 dark:hover:text-jt-mint"
          aria-label={showValue ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {showValue ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  </div>
);

export const AuthView = () => {
  const { setCurrentView, goBack } = useAppContext();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#signup') {
        setIsSignUp(true);
        setIsResetPassword(false);
        setIsUpdatePassword(false);
      } else if (hash === '#reset') {
        setIsResetPassword(true);
        setIsSignUp(false);
        setIsUpdatePassword(false);
      } else if (hash === '#update-password') {
        setIsUpdatePassword(true);
        setIsSignUp(false);
        setIsResetPassword(false);
      } else {
        setIsSignUp(false);
        setIsResetPassword(false);
        setIsUpdatePassword(false);
      }
      setError(null);
      setMessage(null);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (!auth) {
        throw new Error('Sign-in is temporarily unavailable. Please try again shortly.');
      }

      if (isUpdatePassword) {
        if (!password) throw new Error('Please enter a new password.');
        if (!auth.currentUser) throw new Error('You must be logged in to update your password.');
        await updatePassword(auth.currentUser, password);
        setMessage('Password updated successfully!');
        setIsUpdatePassword(false);
        window.location.hash = '';
      } else if (isResetPassword) {
        if (!email) throw new Error('Please enter your email address.');
        await sendPasswordResetEmail(auth, email);
        setMessage('Password reset link sent to your email.');
        toast.success('Password reset link sent to your email.');
      } else if (isSignUp) {
        if (!termsAccepted) {
          setError('Please agree to the Privacy Policy and Terms and Conditions before continuing.');
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
        if (fullName) {
          await updateProfile(userCredential.user, { displayName: fullName });
        }

        toast.success('Account created successfully!');
        
        // Log asynchronously in background so redirect is immediate
        logVisitorSignIn(userCredential.user, { phone, referralCode, marketingOptIn }).catch(console.error);
        requestNotificationPermission();

        window.location.hash = '';
        setCurrentView('home');
        window.scrollTo(0, 0);
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        toast.success('Successfully signed in!');

        // Log asynchronously in background so redirect is immediate
        logVisitorSignIn(result.user).catch(console.error);

        window.location.hash = '';
        setCurrentView('home');
        window.scrollTo(0, 0);
      }
    } catch (err: any) {
      let errorMessage = err.message || 'An error occurred.';
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please click "Login" below instead!';
      } else if (
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/invalid-credential'
      ) {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      }
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (showPrivacy) {
    return (
      <section
        aria-modal="true"
        role="dialog"
        aria-label="Privacy Policy"
        className="absolute inset-0 z-[100] overflow-y-auto bg-white animate-fadeInScale dark:bg-jt-ink"
      >
        <PrivacyView onBack={() => { setShowPrivacy(false); window.scrollTo(0, 0); }} />
      </section>
    );
  }

  if (showTerms) {
    return (
      <section
        aria-modal="true"
        role="dialog"
        aria-label="Terms and Conditions"
        className="absolute inset-0 z-[100] overflow-y-auto bg-white animate-fadeInScale dark:bg-jt-ink"
      >
        <TermsView onBack={() => { setShowTerms(false); window.scrollTo(0, 0); }} />
      </section>
    );
  }

  const heading = isResetPassword
    ? 'Reset your password'
    : isUpdatePassword
      ? 'Update your password'
      : isSignUp
        ? 'Create your account'
        : 'Welcome back';

  const subtitle = isResetPassword
    ? "Enter your email and we'll send you a reset link."
    : isUpdatePassword
      ? 'Choose a new password for your account.'
      : isSignUp
        ? 'Sign up for faster checkout and order tracking.'
        : 'Sign in to continue to Joe Tech.';

  return (
    <div className="relative min-h-screen bg-jt-paper px-4 pb-16 pt-24 text-jt-ink transition-colors duration-500 dark:bg-jt-ink dark:text-white">
      <button
        onClick={() => { goBack(); window.scrollTo(0, 0); }}
        className="focus-ring absolute left-4 top-24 z-50 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-jt-ink/60 transition-colors hover:text-jt-blue dark:text-white/60 dark:hover:text-jt-mint sm:left-8"
        aria-label="Go back"
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      <div className="mx-auto w-full max-w-md rounded-[2rem] border border-jt-ink/10 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-jt-ink-soft sm:p-9">
        <div className="mb-7 flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-jt-blue bg-white p-2 shadow-md">
            <LogoMark className="h-full w-full" title="Joe Tech" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-jt-ink dark:text-white sm:text-3xl">{heading}</h1>
          <p className="mt-2 text-sm font-medium text-jt-ink/60 dark:text-white/60 sm:text-base">{subtitle}</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 animate-shake dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-400"
            >
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {message && (
            <div
              role="status"
              aria-live="polite"
              className="rounded-xl border border-jt-blue/20 bg-jt-blue/5 px-4 py-3 text-center text-sm font-semibold text-jt-blue dark:border-jt-mint/20 dark:bg-jt-mint/10 dark:text-jt-mint"
            >
              {message}
            </div>
          )}

          {isSignUp && (
            <div className="grid grid-cols-2 gap-3">
              <Field label="First name" value={firstName} onChange={setFirstName} placeholder="Enter your first name" autoComplete="given-name" />
              <Field label="Last name" value={lastName} onChange={setLastName} placeholder="Enter your last name" autoComplete="family-name" />
            </div>
          )}

          {!isUpdatePassword && (
            <Field
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="Enter your email"
              autoComplete="email"
            />
          )}

          {isSignUp && (
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-jt-ink dark:text-white">
                Phone
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-jt-ink/15 bg-jt-paper pl-3 focus-within:border-jt-blue focus-within:ring-2 focus-within:ring-jt-blue/20 dark:border-white/15 dark:bg-white/5">
                <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-jt-ink/70 dark:text-white/70">
                  🇳🇬 +234
                </span>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  autoComplete="tel-national"
                  className="w-full bg-transparent py-3 pr-4 text-sm font-medium text-jt-ink outline-none placeholder:font-normal placeholder:text-jt-ink/40 dark:text-white dark:placeholder:text-white/40"
                />
              </div>
            </div>
          )}

          {!isResetPassword && (
            <div>
              <Field
                label={isUpdatePassword ? 'New password' : 'Password'}
                value={password}
                onChange={setPassword}
                placeholder={isUpdatePassword ? 'Enter your new password' : 'Enter your password'}
                showToggle
                showValue={showPassword}
                onToggleShow={() => setShowPassword((v) => !v)}
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
              />
              {!isSignUp && !isUpdatePassword && (
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    onClick={() => { window.location.hash = 'reset'; }}
                    className="text-xs font-bold text-jt-blue hover:underline dark:text-jt-mint"
                  >
                    Forgotten Password?
                  </button>
                </div>
              )}
            </div>
          )}

          {isSignUp && (
            <>
              <Field
                label="Have a referral code?"
                value={referralCode}
                onChange={setReferralCode}
                placeholder="Enter referral code"
                required={false}
              />

              <label className="flex cursor-pointer items-start gap-2.5 text-xs font-medium text-jt-ink/70 dark:text-white/70">
                <input
                  type="checkbox"
                  checked={marketingOptIn}
                  onChange={(e) => setMarketingOptIn(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-jt-ink/30 accent-jt-blue dark:border-white/30"
                />
                I want to receive emails and other marketing and promotional communications from Joe Tech.
              </label>

              <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-jt-ink/12 bg-jt-paper p-3 text-xs font-medium text-jt-ink/70 dark:border-white/12 dark:bg-white/5 dark:text-white/70">
                <input
                  type="checkbox"
                  required
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-jt-ink/30 accent-jt-blue dark:border-white/30"
                  aria-label="Accept Privacy Policy and Terms and Conditions"
                />
                <span>
                  I have read and agree to the{' '}
                  <button
                    type="button"
                    onClick={() => { setShowPrivacy(true); window.scrollTo(0, 0); }}
                    className="font-bold text-jt-blue hover:underline dark:text-jt-mint"
                  >
                    Privacy Policy
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    onClick={() => { setShowTerms(true); window.scrollTo(0, 0); }}
                    className="font-bold text-jt-blue hover:underline dark:text-jt-mint"
                  >
                    Terms and Conditions
                  </button>
                  .
                </span>
              </label>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="focus-ring w-full rounded-xl bg-jt-blue py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-jt-blue/25 transition-all hover:-translate-y-0.5 hover:bg-jt-blue-soft hover:shadow-xl hover:shadow-jt-blue/30 disabled:translate-y-0 disabled:opacity-70"
          >
            {loading ? (
              <>
                <span className="spinner" aria-hidden="true" />
                {isResetPassword ? 'Sending...' : isUpdatePassword ? 'Updating...' : isSignUp ? 'Signing up...' : 'Signing in...'}
              </>
            ) : isResetPassword ? (
              'Send Link'
            ) : isUpdatePassword ? (
              'Update'
            ) : isSignUp ? (
              'Sign Up'
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          {isResetPassword || isUpdatePassword ? (
            <button
              onClick={() => { window.location.hash = 'signin'; }}
              className="focus-ring text-sm font-bold text-jt-blue hover:underline dark:text-jt-mint"
            >
              Back to Login
            </button>
          ) : (
            <button
              onClick={() => { window.location.hash = isSignUp ? 'signin' : 'signup'; }}
              className="focus-ring text-sm font-semibold text-jt-ink/70 dark:text-white/70"
            >
              {isSignUp ? (
                <>Already have an account? <span className="font-bold text-jt-blue dark:text-jt-mint">Login</span></>
              ) : (
                <>Don&apos;t have an account? <span className="font-bold text-jt-blue dark:text-jt-mint">Sign up</span></>
              )}
            </button>
          )}
        </div>

        <p className="mt-6 text-center text-xs font-medium text-jt-ink/45 dark:text-white/45">
          By signing up, you agree to our{' '}
          <button onClick={() => { setShowTerms(true); window.scrollTo(0, 0); }} className="font-bold underline">
            Terms of Service
          </button>{' '}
          and{' '}
          <button onClick={() => { setShowPrivacy(true); window.scrollTo(0, 0); }} className="font-bold underline">
            Privacy Policy
          </button>
          .
        </p>
      </div>
    </div>
  );
};