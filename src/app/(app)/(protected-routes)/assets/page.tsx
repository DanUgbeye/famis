import AssetsTable from "@/components/tables/assets-table";
import { Container } from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PAGES } from "@/data/page-map";
import { cn } from "@/lib/utils";
import {
  getAllAssets,
  getUserAssets,
} from "@/server/modules/asset/asset.actions";
import { getLoggedInUser } from "@/server/modules/auth/auth.actions";
import { Asset } from "@/types/asset.types";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ViewAssetsPage() {
  const user = await getLoggedInUser();
  if (!user) redirect(PAGES.HOME);

  let assets: Asset[];

  if (user.role === "admin") {
    assets = (await getAllAssets()).filter((asset) => asset.status !== "Sold");
  } else {
    assets = (await getUserAssets(user._id)).filter(
      (asset) => asset.status !== "Sold"
    );
  }

  return (
    <main className=" py-10 ">
      <Container className=" space-y-5">
        {user.role === "user" && (
          <div className=" flex justify-end ">
            <Link
              href={PAGES.CREATE_ASSET}
              className={cn(
                buttonVariants({}),
                " bg-blue-700 hover:bg-blue-600"
              )}
            >
              Add Asset
            </Link>
          </div>
        )}

        <Card>
          <CardHeader className="px-7">
            <CardTitle>Assets</CardTitle>
            <CardDescription>All available assets</CardDescription>
          </CardHeader>

          <CardContent>
            {assets.length <= 0 ? (
              <>
                <div className=" py-10 text-center ">
                  There are no available assets
                </div>
              </>
            ) : (
              <AssetsTable assets={assets} />
            )}
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
