"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { headerData } from "../Header/Navigation/menuData";
import Logo from "./Logo";
import Image from "next/image";
import HeaderLink from "../Header/Navigation/HeaderLink";
import MobileHeaderLink from "../Header/Navigation/MobileHeaderLink";
import Signin from "@/components/Auth/SignIn";
import SignUp from "@/components/Auth/SignUp";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react/dist/iconify.js";

const Header: React.FC = () => {
  const pathUrl = usePathname();
  const { theme, setTheme } = useTheme();

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);
  const signInRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setSticky(window.scrollY >= 80);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      signInRef.current &&
      !signInRef.current.contains(event.target as Node)
    ) {
      setIsSignInOpen(false);
    }
    if (
      signUpRef.current &&
      !signUpRef.current.contains(event.target as Node)
    ) {
      setIsSignUpOpen(false);
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen, isSignInOpen, isSignUpOpen]);

  useEffect(() => {
    if (isSignInOpen || isSignUpOpen || navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSignInOpen, isSignUpOpen, navbarOpen]);

  return (
    <header
      className={`fixed top-0 z-40 w-full pb-5 transition-all duration-300 ${sticky ? "shadow-lg py-5" : "shadow-none py-6"
        }`}
      /* debug: add bg so hamburger contrast visible on mobile */
      style={{ background: "#ffffff" }}
    >
      <div className="lg:py-0 py-2">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md flex items-center justify-between px-4">
          <Logo />
          <nav className="hidden lg:flex flex-grow items-center gap-8 justify-center">
            {headerData.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="hidden lg:block bg-primary text-white hover:bg-primary/15 hover:text-primary px-16 py-5 rounded-full text-lg font-medium"
              onClick={() => {
                setIsSignInOpen(true);
              }}
            >
              Sign In
            </Link>

            {isSignInOpen && (
              <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
                <div
                  ref={signInRef}
                  className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg px-8 pt-14 pb-8 text-center bg-white"
                >
                  <button
                    onClick={() => setIsSignInOpen(false)}
                    className="absolute top-0 right-0 mr-8 mt-8 dark:invert"
                    aria-label="Close Sign In Modal"
                  >
                    <Icon
                      icon="tabler:currency-xrp"
                      className="text-black hover:text-primary text-24 inline-block me-2"
                    />
                  </button>
                  <Signin />
                </div>
              </div>
            )}

            <Link
              href="#"
              className="hidden lg:block bg-primary/15 hover:bg-primary text-primary hover:text-white px-16 py-5 rounded-full text-lg font-medium"
              onClick={() => {
                setIsSignUpOpen(true);
              }}
            >
              Sign Up
            </Link>

            {isSignUpOpen && (
              <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
                <div
                  ref={signUpRef}
                  className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white backdrop-blur-md px-8 pt-14 pb-8 text-center"
                >
                  <button
                    onClick={() => setIsSignUpOpen(false)}
                    className="absolute top-0 right-0 mr-8 mt-8 dark:invert"
                    aria-label="Close Sign Up Modal"
                  >
                    <Icon
                      icon="tabler:currency-xrp"
                      className="text-black hover:text-primary text-24 inline-block me-2"
                    />
                  </button>
                  <SignUp />
                </div>
              </div>
            )}

            {/* MOBILE HAMBURGER */}
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="block lg:hidden p-2 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              {/* changed bg-white -> bg-black for visibility on white header */}
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
              <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
            </button>
          </div>
        </div>

        {/* overlay */}
        {navbarOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-40" />
        )}

        {/* MOBILE MENU PANEL */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 h-full w-full transform transition-transform duration-300 max-w-xs ${navbarOpen ? "translate-x-0" : "translate-x-full"
            } z-50`}
        >
          {/* Add border + bg + padding so it's visible in mobile */}
          <div className="h-full bg-white dark:bg-darkmode shadow-lg border-l-2 border-gray-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-midnight_text dark:text-midnight_text">
                <Logo />
              </h2>

              <button
                onClick={() => setNavbarOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded bg-transparent border border-transparent hover:border-gray-200"
                aria-label="Close menu Modal"
              >
                {/* Use next/image or svg for close icon — fallback to text X for debugging */}
                <span className="sr-only">Close</span>
                <svg width="18" height="18" viewBox="0 0 24 24" className="text-gray-600">
                  <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col items-start p-4 space-y-2">
              {/* add border to each nav item for debug visibility */}
               {headerData.map((item, index) => (
                <div key={index} className="w-full border-b border-gray-100">
                  <MobileHeaderLink
                    item={item}
                    onNavigate={() => setNavbarOpen(false)}   // ← ADD THIS
                  />
                </div>
              ))}


              <div className="mt-4 flex flex-col space-y-4 w-full px-2">
                <Link
                  href="#"
                  className="block w-full text-center bg-transparent border border-primary text-primary px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white"
                  onClick={() => {
                    setIsSignInOpen(true);
                    setNavbarOpen(false);
                  }}
                >
                  Sign In
                </Link>
                <Link
                  href="#"
                  className="block w-full text-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  onClick={() => {
                    setIsSignUpOpen(true);
                    setNavbarOpen(false);
                  }}
                >
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
