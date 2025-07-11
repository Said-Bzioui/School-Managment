import { useFetch } from "../api/fetching";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

const Announcements = () => {
  const { data, isLoading, error } = useFetch("/announcements");

  if (error) {
    return (
      <div className="bg-white w-full h-96 md:w-96 rounded-lg p-2 flex justify-center items-center">
        <p className="text-red-500 text-[15px] text-center ">Cnnot get Teachers ! Please try again later.</p>
      </div>

    );
  }
  return (
    <div className="md:w-1/2 lg:w-full bg-white p-4 rounded-md ">
      <div className="flex items-center justify-between">
        <h1 className="text-lg ">Announcements</h1>
        <span ></span>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-xs text-white cursor-pointer ">View All</Button>
          </DialogTrigger>
          <DialogContent className=" bg-white border-none">
            <DialogHeader>
              <DialogTitle>All Annoncements</DialogTitle>
              <DialogDescription>
                Exploire the school Annoncements
              </DialogDescription>
            </DialogHeader>


            <ScrollArea className="h-[70vh] w-full rounded-md px-3">
              {data?.data.map((announcement) => (
                <div key={announcement.id} className={` bg-muted  rounded-md p-4 my-4`}>
                  <div className="flex items-center justify-between">
                    <h2 className="font-medium">{announcement.title}</h2>
                    <span className="text-[13px] text-gray-400 bg-white rounded-md px-1 py-0.5">
                      {announcement.target}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 truncate">
                    {announcement.content}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {isLoading ?
          (<div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-3 ">
              <div className="flex items-center justify-between ">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[80px]" />
              </div>
              <Skeleton className="h-4 w-[280px]" />

            </div>
            <div className="flex flex-col space-y-3 ">
              <div className="flex items-center justify-between ">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[80px]" />
              </div>
              <Skeleton className="h-4 w-[280px]" />

            </div>
          </div>) :
          data?.data?.length > 0 ? (
            data.data.slice(0, 3).map((announcement) => (
              <div key={announcement.id} className={` bg-muted  rounded-md p-4`}>
                <div className="flex items-center justify-between">
                  <h2 className="font-medium">{announcement.title}</h2>
                  <span className="text-[12px] text-gray-400 bg-white rounded-md px-1 py-0.5">
                    {announcement.target}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-1 truncate">
                  {announcement.content}
                </p>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-primary mx-auto">No announcements available</h1>
            </div>
          )}
      </div>
    </div>
  );
};

export default Announcements;
