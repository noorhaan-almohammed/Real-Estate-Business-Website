import type { ReactNode } from "react";
import InfoComponent from "../sharedComponents/InfoComponent";
import Button from "../sharedComponents/Button";
// Contact Detail Data type
interface ContactDetails {
        icon: ReactNode;
        title: string[];
}
// Card Data type
interface LocationCardData {
    title:string,
    address:string,
    description:string,
    btnText:string,
    btnLink:string,
    contactDetails:ContactDetails[],
}
function LocationCard({title,address,description,contactDetails,btnLink,btnText}:LocationCardData) {
    return (
        <div className="lg:w-[49.0607%] w-full bg-Grey-08 border border-Grey-15 p-6 lg:p-10 xl:p-12.5 rounded-xl flex justify-between flex-col xl:gap-10 md:gap-7.5 gap-6">
            <div>
                <span className="urbanist text-sm xl:text-lg font-medium text-White">{title}</span>
                <h3 className="xl:text-3xl md:text-2xl text-xl font-semibold mt-1 mb-2 md:mt-1.5 md:mb-2.5 xl:mt-2.5 xl:mb-3.5 text-White">{address}</h3>
                <p className="text-sm md:text-base xl:text-lg font-medium text-Grey-60">{description}</p>
            </div>
            <div className="flex gap-2 xl:gap-2.5 flex-wrap">
                {contactDetails.map((cont,index) => {
                    return(
                        <InfoComponent key={index} icon={cont.icon} desc={cont.title} padding={"py-2.5 px-4 xl:py-3.5 xl:px-5"}/>
                    )
                })}
            </div>
            <Button link={btnLink} content={btnText} className="bg-Purple-60"/>
        </div>
    )
}

export default LocationCard
