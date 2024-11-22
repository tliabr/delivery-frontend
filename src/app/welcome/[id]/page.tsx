"use client";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {formatCurrency} from "@/utils/helpers";
import "../../styles/Page.css";

interface UserContent {
    title: string;
    message: string;
    totalPrice: number; // client side string formatting
    freeGift: boolean;
}
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export default function Welcome() {
    const {id} = useParams();
    const [userContent, setUserContent] = useState<UserContent | null>(null);
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(`${baseUrl}/comms/your-next-delivery/${id}`);
                const data: UserContent = await response.json();
                console.log(data);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                setUserContent(data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchContent();
    }, []);
    return (
        <>
            {userContent === null ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="container">
                    <div className="image-container">
                        <img src="/my-cats.jpeg" alt="" className="image"/>
                    </div>
                    <div className="content">
                        <h1 className="title">{userContent.title}</h1>
                        <p className="message">{userContent.message}</p>
                        <p className="total-price">Total price: {formatCurrency(userContent.totalPrice)}</p>
                    </div>
                    <div className="buttons">
                        <button className="btn primary-btn">SEE DETAILS</button>
                        <button className="btn secondary-btn">EDIT DELIVERY</button>
                    </div>


                    {userContent.freeGift && (
                        <div className="free-gift">
                            <p className="free-gift-text">FREE GIFT</p>
                        </div>
                    )}
                </div>
            )}
        </>
        );
    }


