import { getMemberPhotoByUserId } from "@/actions/memberActions";
import { CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import React from "react";

export default async function PhotoPage({
   params,
}: {
   params: { userId: string };
}) {
   const photo = await getMemberPhotoByUserId(params.userId);

   return (
      <>
         <CardHeader className="text-2xl font-semibold text-secondary">
            Photo
         </CardHeader>
         <Divider />
         <CardBody>
            <div className="grid grid-cols-5 gap-3">
               {photo &&
                  photo.map((photos) => (
                     <div key={photos.id}>
                        <Image
                           isZoomed
                           width={150}
                           height={150}
                           src={photos.url}
                           alt="image of member"
                           className="aspect-square object-cover"
                        />
                     </div>
                  ))}
            </div>
         </CardBody>
      </>
   );
}
