import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "../../views/HomePage";
import Login from "../../views/Login";
import KoikParkimiskohad from "../../views/KoikParkimiskohad";
import ParkimiskohaLopetamine from "../../views/ParkimiskohaLopetamine";
import ParkimisKohtadeKoondaruanne from "../../views/ParkimisKohtadeKoondaruanne";



export default function ReactRouter() {
    return       (
        <BrowserRouter>
        <Routes>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path={"/"} element={<Login />}></Route>
            <Route path={"/parkimiskoht/koik"} element={<KoikParkimiskohad />}></Route>
            <Route path={"/parkimiskoht/detailid"} element={<KoikParkimiskohad />}></Route>
            <Route path={"/parkimiskoht/lopeta"} element={<ParkimiskohaLopetamine />}></Route>
            <Route path={"/parkimiskoht/koondaruanne"} element={<ParkimisKohtadeKoondaruanne />}></Route>
        </Routes>
    </BrowserRouter>)
}