import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";

type Props = {
  item: HeaderItem;
  onNavigate?: () => void; // callback from Header to close mobile menu
};

const MobileHeaderLink: React.FC<Props> = ({ item, onNavigate }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setSubmenuOpen((s) => !s);
  };

  // If the item has submenu, we render a button that toggles it.
  // If it doesn't, clicking the Link will navigate and we call onNavigate to close the menu.
  return (
    <div className="relative w-full">
      {item.submenu ? (
        <>
          <button
            type="button"
            onClick={handleToggle}
            className="flex items-center justify-between w-full py-3 px-2 text-left text-gray-700"
            aria-expanded={submenuOpen}
            aria-controls={`${item.label.replace(/\s+/g, "-").toLowerCase()}-submenu`}
          >
            <span>{item.label}</span>
            <svg
              className={`${submenuOpen ? "rotate-180" : ""} transition-transform`}
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m7 10l5 5l5-5"
              />
            </svg>
          </button>

          {submenuOpen && (
            <div
              id={`${item.label.replace(/\s+/g, "-").toLowerCase()}-submenu`}
              className="bg-white p-2 w-full"
            >
              {item.submenu!.map((subItem, index) => (
                <Link
                  key={index}
                  href={subItem.href}
                  className="block py-2 px-2 text-gray-600 hover:bg-gray-100 rounded"
                  onClick={() => {
                    // close mobile menu after navigation
                    onNavigate?.();
                  }}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.href}
          className="flex items-center justify-between w-full py-3 px-2 text-gray-700"
          onClick={() => {
            // close mobile menu after navigation
            onNavigate?.();
          }}
        >
          {item.label}
        </Link>
      )}
    </div>
  );
};

export default MobileHeaderLink;
