"use client"
import "./navbar.css";
import Button from "./button/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPeopleGroup} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    return (
        <>
            <nav>
                <Button>
                    <FontAwesomeIcon icon={faPeopleGroup} />
                    Artists
                </Button>
            </nav>
        </>
    )
}