import Link from "next/link";
import PageHead from "@/components/PageHead";
import { Arrow } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="page page-end">
      <PageHead label="404" title="Wrong" italic="turn." intro="That page doesn't exist. The coast road is this way." />
      <div className="wrap">
        <Link className="btn" href="/">
          Back to the start <Arrow />
        </Link>
      </div>
    </div>
  );
}
