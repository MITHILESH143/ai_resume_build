import { ResumeSectionProps } from "@/lib/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export const PersonalInfoHeader = ({ resumeData }: ResumeSectionProps) => {
  const { firstName, lastName, phone, photo, jobTitle, city, country, email } =
    resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    //if type of photo is File we will convert it into objectUrl
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");

    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex items-center gap-4">
      {photoSrc && (
        <Image
          src={photoSrc}
          height={80}
          width={80}
          className="aspect-square object-cover"
          alt="Author Image"
        />
      )}

      <div className="space-y-1.5">
        <div className="space-y-1">
          <p className="text-3xl font-bold">
            {firstName} {lastName}
          </p>
          <p className="font-medium">{jobTitle}</p>
        </div>
        <p className="text-xs text-gray-500">
          {city}
          {city && country && ", "}
          {country}
          {(city || country) && (phone || email) && " • "}
          {[phone,email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
};
