import { Mail, Phone, MapPinMinusInside } from "lucide-react";

export default function CareerlyContactInfo() {
    return (
        <div>
            <h4>Contact Info</h4>

            <div className="flex flex-col gap-3">
                <div className="flex flex-row gap-2 mt-2 text-sm">
                    <Mail />
                    <p>careerly@business.com</p>
                </div>

                <div className="flex flex-row gap-2 text-sm ">
                    <Phone />
                    <p>+91 88888 98989</p>
                </div>

                <div className="flex flex-row gap-2 text-sm">
                    <MapPinMinusInside />
                    <p> 30 Career Street, Sucess City.</p>
                </div>
            </div>
        </div>
    );
}
