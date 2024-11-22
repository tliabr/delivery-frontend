"use client";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {formatCurrency} from "@/utils/helpers";
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
    return <>
        {userContent === null
            ? <p>Loading...</p>
            : <>
                <h1>{userContent.title}</h1>
                <p>{userContent.message}</p>
                <p>Total price: {formatCurrency(userContent.totalPrice)}</p>
                {userContent.freeGift && <p>You get a free gift!</p>}
            </>
        }
    </>
}
