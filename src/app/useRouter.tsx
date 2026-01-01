"use client";

import NextLink, { LinkProps } from "next/link";
import { usePathname, useParams } from "next/navigation";
import React from "react";

const useLocation = () => {
  const pathname = usePathname();

  return {
    pathname,
  };
};

const Link = ({
  to,
  href,
  ...args
}: Omit<LinkProps, "href"> & {
  to?: string;
  href?: string;
  className?: string;
  children?: React.ReactNode | undefined;
}) => {
  return <NextLink href={href || to || ""} {...args} />;
};

interface NavLinkProps extends Omit<LinkProps, "href" | "className"> {
  to?: string;
  href?: string;
  className?: string | ((props: { isActive: boolean; isPending: boolean }) => string | undefined);
  children?: React.ReactNode;
  end?: boolean;
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, href, className, end, ...props }, ref) => {
    const pathname = usePathname();
    const targetPath = (href || to || "").toString();

    const isActive =
      pathname === targetPath ||
      (!end && pathname.startsWith(targetPath) && targetPath !== "/");

    const isPending = false;

    const resolvedClassName =
      typeof className === "function"
        ? className({ isActive, isPending })
        : className;

    return (
      <NextLink
        ref={ref}
        href={targetPath}
        className={resolvedClassName}
        {...props}
      />
    );
  }
);
NavLink.displayName = "NavLink";

export { Link, NavLink, useLocation, useParams };
export type { NavLinkProps };
