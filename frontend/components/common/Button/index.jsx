import Link from "next/link";

const Button = ({ href, onClick, label, customClass }) => {
  return (
    <Link href={href}>
      <div>
        <button
          className={`p-3 rounded-md text-white text-center text-md w-full transition duration-700 ${customClass}`}
          onClick={onClick}
        >
          {label}
        </button>
      </div>
    </Link>
  );
};

export default Button;
