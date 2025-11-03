"use client";
import Image from "next/image";
import styles from "./LoginPage.module.css";
import { GoogleLoginButton } from "@/components/ui/auth/GoogleLoginButton/GoogleLoginButton";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/loader/Loader";

export const LoginPage = () => {
  const { loginWithGoogle } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("Ocurrio un error al iniciar sesión. Intente de nuevo más tarde");
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await loginWithGoogle();
      if (res.success) {
        router.push("/");
        setIsLoading(false);
      } else {
        console.error(res.error);
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.back}>
        <section className={styles.container}>
          <div className={styles.logoContainer}>
            <Image src="/images/logo.png" width={120} height={120} alt="manduapp logo"></Image>
            <h1>ManduApp</h1>
          </div>
          <div className={styles.greetingContainer}>
            <h2>¡Bienvenido!</h2>
            <p>Accedé a tus listas, desde cualquier dispositivo.</p>
          </div>
          <div className={styles.authMethodsContainer}>
            <div className={styles.googleAuthContainer}>
              <GoogleLoginButton onLogin={handleLogin} />
            </div>
            {isError && <p className={styles.error}>{error}</p>}
          </div>
        </section>
      </div>
      {isLoading && <Loader fullScreen="true" backdrop="true" />}
    </>
  );
};
