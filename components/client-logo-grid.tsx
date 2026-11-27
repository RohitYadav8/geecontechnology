import Image from "next/image";

type Client = {
  id: string;
  name: string;
  logo: string;
  featured?: boolean;
};

/* Hairline logo wall: cells share 1px rules, logos are grayscale
   until hovered. Each client appears once. */
export default function ClientLogoGrid({ clients }: { clients: Client[] }) {
  return (
    <ul className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {clients.map((client) => (
        <li
          key={client.id}
          className="group relative flex aspect-[3/2] items-center justify-center border-b border-r border-line bg-white p-6 sm:p-8"
        >
          <Image
            src={client.logo}
            alt={client.name}
            width={180}
            height={80}
            className="max-h-14 w-auto object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:max-h-16"
          />
          {client.featured && (
            <span
              aria-hidden
              className="absolute left-3 top-3 h-1.5 w-1.5 bg-accent"
            />
          )}
        </li>
      ))}
    </ul>
  );
}
