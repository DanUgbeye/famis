"use client";

import { Activity } from "@/types/activity.types";
import { Asset } from "@/types/asset.types";
import { Container } from "@/components/container";
import FormButton from "@/components/form-button";
import RoundProgressBar from "@/components/round-progress-bar";
import ActivityTable from "@/components/tables/activity-table";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PAGES } from "@/data/page-map";
import { cn } from "@/lib/utils";
import { getAssetActivities } from "@/server/modules/activity/activity.actions";
import { deleteAsset, getAsset } from "@/server/modules/asset/asset.actions";
import { getLoggedInUser } from "@/server/modules/auth/auth.actions";
import { Pencil, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { useFormEffect } from "@/hooks/use-form-effect";
import { toast } from "react-toastify";
import Spinner from "@/components/spinner";

export default function ViewAssetScreen(props: {
  asset: Asset;
  activities: Activity[];
}) {
  const { asset, activities } = props;
  const router = useRouter();

  const [state, deleteAssetAction] = useFormState(deleteAsset, {
    status: "UNSET",
    message: "",
    timestamp: Date.now(),
  });

  useFormEffect(state, (changedState) => {
    if (changedState.status === "ERROR") {
      toast.error(changedState.message);
    }
    if (changedState.status === "SUCCESS") {
      toast.success(changedState.message);
      redirect(PAGES.ASSETS);
    }
  });

  return (
    <main className=" py-10 ">
      <Container className=" space-y-5">
        <Card>
          <CardHeader className="px-7">
            <div className=" space-y-4 ">
              <div className=" flex flex-col-reverse gap-4 sm:grid sm:grid-cols-[1fr,auto] sm:items-center ">
                <div className=" space-y-1">
                  <CardTitle className=" text-3xl font-semibold ">
                    {asset.name}
                  </CardTitle>
                  <CardDescription>{asset.description}</CardDescription>
                </div>

                <div className=" ml-auto flex items-center gap-1 ">
                  <Link
                    href={`${PAGES.ASSETS}/${asset._id}/edit`}
                    className={cn(
                      buttonVariants(),
                      " size-9 bg-blue-700 p-0 hover:bg-blue-600"
                    )}
                  >
                    <Pencil className=" size-4 " />
                  </Link>

                  <form action={deleteAssetAction}>
                    <input
                      id="assetId"
                      name="assetId"
                      type="text"
                      defaultValue={asset._id}
                      className="hidden"
                    />

                    <FormButton
                      className={cn(" size-9 bg-red-600 p-0 hover:bg-red-500")}
                    >
                      {({ loading }) =>
                        loading ? (
                          <Spinner className=" size-4 " />
                        ) : (
                          <Trash className=" size-4 " />
                        )
                      }
                    </FormButton>
                  </form>
                </div>
              </div>

              <div className=" flex flex-wrap items-center gap-5 sm:grid sm:grid-cols-[1fr,auto] ">
                <div className=" flex flex-wrap gap-x-4 gap-y-2 ">
                  <div className=" space-y-1 ">
                    <span className=" text-xs font-semibold text-neutral-400 sm:text-sm ">
                      Bought on:
                    </span>

                    <div className="  font-medium sm:text-lg ">
                      {new Date(asset.acquisitionDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className=" space-y-1 ">
                    <span className=" text-xs font-semibold text-neutral-400 sm:text-sm ">
                      Initial cost:
                    </span>

                    <div className="  font-medium sm:text-lg ">
                      {asset.purchaseCost.toLocaleString(undefined, {
                        style: "currency",
                        currency: "NGN",
                      })}
                    </div>
                  </div>

                  <div className=" space-y-1 ">
                    <span className=" text-xs font-semibold text-neutral-400 sm:text-sm ">
                      Depreciation Rate (per year):
                    </span>

                    <div className="  font-medium sm:text-lg ">
                      {asset.depreciationRate.toLocaleString(undefined, {
                        style: "decimal",
                        maximumFractionDigits: 2
                      }) + "%"}
                    </div>
                  </div>
                </div>

                <div className="  ">
                  <div className=" flex flex-wrap items-center gap-x-2 ">
                    <div className=" size-20 sm:size-28 ">
                      <RoundProgressBar
                        value={Number(
                          asset.currentValuePercentage.toLocaleString(
                            undefined,
                            {
                              maximumFractionDigits: 0,
                            }
                          )
                        )}
                        text={`${Number(
                          asset.currentValuePercentage.toLocaleString(
                            undefined,
                            {
                              maximumFractionDigits: 0,
                            }
                          )
                        )}%`}
                      />
                    </div>

                    <div className=" space-y-1 ">
                      <span className=" text-xs font-semibold text-neutral-400 sm:text-sm ">
                        Current Value:
                      </span>

                      <div className="  text-lg font-semibold sm:text-xl ">
                        {asset.currentValue.toLocaleString(undefined, {
                          style: "currency",
                          currency: "NGN",
                          // notation: "compact",
                        })}
                      </div>

                      <div className="  text-xs font-medium sm:text-sm ">
                        <span
                          className={cn(" ", {
                            " text-red-600":
                              asset.currentValue - asset.purchaseCost < 0,
                            " text-green-600":
                              asset.currentValue - asset.purchaseCost > 0,
                          })}
                        >
                          {(
                            asset.currentValue - asset.purchaseCost
                          ).toLocaleString(undefined, {
                            style: "currency",
                            currency: "NGN",
                            // notation: "compact",
                            maximumFractionDigits: 2,
                          })}
                        </span>{" "}
                        (
                        <span
                          className={cn(" ", {
                            " text-red-600":
                              asset.currentValue - asset.purchaseCost < 0,
                            " text-green-600":
                              asset.currentValue - asset.purchaseCost > 0,
                          })}
                        >
                          {(asset.currentValuePercentage - 100).toLocaleString(
                            undefined,
                            {
                              style: "decimal",
                              maximumFractionDigits: 2,
                            }
                          ) + "%"}
                        </span>
                        )
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="px-7">
            <div className=" flex justify-between flex-wrap items-center gap-5 ">
              <CardDescription>All asset activities</CardDescription>

              <Link
                href={`${PAGES.ASSETS}/${asset._id}/edit`}
                className={cn(
                  buttonVariants(),
                  " bg-green-600 hover:bg-green-500 text-xs p-0 pl-2 pr-4 h-9 gap-2"
                )}
              >
                <Plus className=" size-4 " />
                Add
              </Link>
            </div>
          </CardHeader>

          <CardContent>
            {activities.length <= 0 ? (
              <>
                <div className=" py-10 text-center ">
                  There are no activities yet for this asset
                </div>
              </>
            ) : (
              <ActivityTable activities={activities} />
            )}
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}