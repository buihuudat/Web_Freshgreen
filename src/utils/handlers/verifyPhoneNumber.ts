import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

interface Props {}

interface ExtendedWindow extends Window {
  recaptchaVerifier?: RecaptchaVerifier;
  confirmationResult?: any;
}

const auth = getAuth();
declare var window: ExtendedWindow;

export const recaptcha = () => {
  const auth = getAuth();
  window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
    size: "invisible",
    callback: (response: any) => {
      return true;
    },
  });
};

export const phoneVerify = (phoneNumber: string) => {
  const appVerifier = window.recaptchaVerifier;
  if (appVerifier) {
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        // Handle verification error
        console.error(error);
      });
    return true;
  } else {
    console.error("reCAPTCHA verification incomplete");
    return false;
  }
};
