import ForgotPasswordForm from "@/components/login_register/ForgotPasswordForm";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main 
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        backgroundColor: '#FDFBF7',
        backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    >
      {/* Wrapper matching the max-w-md width of the form to align the link perfectly */}
      <div className="w-full max-w-md mb-4">
        <Link 
          href="/login" 
          className="font-mono text-xs font-bold underline hover:text-[#B892FF]"
        >
          ← BACK
        </Link>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-mono mb-2 font-bold">Reset Password</h1>
        <p className="font-mono text-gray-600">Enter your registered email and a new password below.</p>
      </div>
      <ForgotPasswordForm />
    </main>
  );
}