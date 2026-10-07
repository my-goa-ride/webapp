import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import { Arrow } from "@/components/icons";
import { blogPosts } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Journal",
  description: "Goa travel notes: hidden beaches, food trails, airport tips and road trips, with advice on getting around by car.",
};

export default function JournalPage() {
  const lead = blogPosts.find((p) => p.featured) ?? blogPosts[0];
  const rest = blogPosts.filter((p) => p !== lead);

  return (
    <div className="page">
      <PageHead
        label="The Journal"
        title="Notes from"
        italic="the road."
        intro="Hidden beaches, food trails and the practical side of getting around Goa by car."
      />

      <div className="wrap page-end">
        <Link href={`/blogs/${lead.slug}`} className="lead-post">
          <div className="ph">
            <Image src={lead.image} alt="" fill priority sizes="(max-width: 1024px) 100vw, 58vw" />
          </div>
          <div className="txt">
            <span className="label muted">Featured · {lead.category}</span>
            <h2 className="display">{lead.title}</h2>
            <p>{lead.excerpt}</p>
            <span className="ul label on" style={{ alignSelf: "flex-start" }}>
              Read the story <Arrow />
            </span>
          </div>
        </Link>

        <ul className="journal">
          {rest.map((p) => (
            <li key={p.slug} className="entry rv">
              <Link href={`/blogs/${p.slug}`}>
                <div className="ph">
                  <Image src={p.image} alt="" fill sizes="(max-width: 720px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="meta label">
                  <span>{p.category}</span>
                  <span>{p.readTime}</span>
                </div>
                <h3 className="display">{p.title}</h3>
                <p>{p.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
