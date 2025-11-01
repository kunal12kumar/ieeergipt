// Header code here
"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/moving-border";

const poppins=Poppins({
  weight: ['400'],
   subsets: ['latin']
})

export function NavbarDemo() {
  const navItems = [
    {
      name: "Events",
      link: '/Upcomingevents/details',
    },
    {
      name: "Our Team",
      link: "/team",
    },
    {
      name: "Leaderboard",
      link: "/leaderboard",
    },
    
    {
        name: "About Us",
        link: "/about_us"
    },
   
    {
        name:"Contact Us",
        link: "/contact_us"
    }
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative  z-50  w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center justify-center gap-2">
             <NavbarButton variant="primary"  className=" bg-[#4a6cd2] ">Login</NavbarButton>
            <NavbarButton variant="gradient"  className=" bg-[#4a6cd2] ">Sign Up</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`relative text-black ${poppins.className} text-xl dark:text-neutral-300`}>
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full  flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full bg-[#4a6cd2] text-xl">
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full bg-[#4a6cd2] text-xl">
                Sign Up
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    
      {/* Navbar */}
    </div>
  );
}
