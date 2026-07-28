import Image from "next/image";
import type { Client } from "../lib/clients-data";

export function ClientMarquee({ clients, speed = 30 }: { clients: Client[]; speed?: number }) {
    const loop = [...clients, ...clients];

    return (
        <div className="relative w-full overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <style>{`
        @keyframes geecon-client-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
            <div
                className="flex w-max items-center gap-16"
                style={{ animation: `geecon-client-marquee ${speed}s linear infinite` }}
            >
               {loop.map((client, i) => {
  console.log(client.name, client.logo);

  if (!client.logo) return null;

  return (
    <Image
      key={`${client.id}-${i}`}
      src={client.logo}
      alt={client.name}
      width={120}
      height={40}
    />
  );
})}
            </div>
        </div>
    );
}