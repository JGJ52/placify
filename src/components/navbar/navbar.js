"use client"
import "./navbar.css";
import Button from "./button/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPeopleGroup} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    return (
        <>
            <nav>
                <div className="flex flex-row">
                    <Button>
                        <FontAwesomeIcon icon={faPeopleGroup} />
                        Artists
                    </Button>
                    <Button>
                        <FontAwesomeIcon icon={faList} />
                        Playlists
                    </Button>
                </div>
            </nav>
        </>
    )
}