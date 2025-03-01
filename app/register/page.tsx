import RegisterForm from "../ui/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="w-full flex mt-5 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl w-full text-center font-bold mb-6">Register</h1>
        <RegisterForm />
      </section>
    </div>
  );
}
