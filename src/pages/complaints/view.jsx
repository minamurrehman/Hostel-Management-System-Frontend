import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const ViewComplaint = () => {
  const { id } = useParams();
  const { data, isLoading, error, isLoadingError, isError } = useQuery({
    queryKey: [`user-complaint-${id}`],
    queryFn: () => api.get(`/complaints/${id}`),
    select: (data) => data.data.data,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoadingError || isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>View User Request</CardTitle>
        <CardDescription>
          You can see the content of the user request here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <h2 className="text-lg border  p-2 rounded-md">{data?.user?.name}</h2>
        <p className="text-lg border  p-2 rounded-md">{data?.user?.email}</p>
        <p className="text-lg border  p-2 rounded-md py-4">{data?.message}</p>
        <p className="text-lg border  p-2 rounded-md">{data?.status}</p>
        <p className="text-lg border  p-2 rounded-md">
          {new Date(data?.createdAt)
            .toISOString()
            .replace(/T/, " ")
            .replace(/\..+/, "")}
        </p>
        <p className="text-lg border  p-2 rounded-md">
          Room No. {data?.user?.room?.roomNumber}
        </p>
        <p className="text-lg border  p-2 rounded-md">
          Floor No. {data?.user?.room?.floor}
        </p>
      </CardContent>
    </Card>
  );
};

export default ViewComplaint;
