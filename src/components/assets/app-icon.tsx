import * as React from "react"

const AppIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="96" height="96" rx="48" fill="#050A0A" />
    <path d="M48 40L41 36V28L48 24L55 28V36L48 40Z" fill="#4187F5" />
    <path d="M62 48L55 44V36L62 32L69 36V44L62 48Z" fill="#4187F5" />
    <path d="M55 60V52L62 48L69 52V60L62 64L55 60Z" fill="#4187F5" />
    <path d="M41 60L48 56L55 60V68L48 72L41 68V60Z" fill="#4187F5" />
    <path d="M34 48L41 52V60L34 64L27 60V52L34 48Z" fill="#4187F5" />
    <path d="M34 48L41 44V36L34 32L27 36V44L34 48Z" fill="#4187F5" />
  </svg>
)

export default AppIcon
