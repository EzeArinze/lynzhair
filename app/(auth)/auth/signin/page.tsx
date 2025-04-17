// import LoadingSpinner from "@/components/Loader";
import SignIn from "@/components/AuthUi/SignIn";
// import dynamic from "next/dynamic";

// const UserSignin = dynamic(() => import("@/components/AuthUi/SignIn"), {
//   loading: () => <LoadingSpinner />,
//   ssr: false,
// });

function SignInPage() {
  return <SignIn />;
}

export default SignInPage;
