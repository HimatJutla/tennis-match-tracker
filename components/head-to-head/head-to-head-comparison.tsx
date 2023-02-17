import { HeadToHeadComparisonComponentPropsInterface } from "@/interfaces/props/component-props/head-to-head-comparison-component-props.interface";
import PlayerDetailsCard from "../players/playerDetailsCard";

export default function HeadToHeadComparison({playerOne, playerTwo, headToHeadMatches}: HeadToHeadComparisonComponentPropsInterface) {
    console.log(playerOne, playerTwo, headToHeadMatches);


    return (
        <>
            <div
                className='title-container'>
                {playerOne?.firstName.toUpperCase()} {playerOne?.lastName.toUpperCase()} VS {playerTwo?.firstName.toUpperCase()} {playerTwo?.lastName.toUpperCase()}
            </div>
            <div
                className='flex items-center justify-center'>
                <div
                    className='flex items-center'>
                    <div
                        className='flex items-center'>
                        <img src={playerOne?.image} alt="Image of Player One" />
                    </div>
                </div>
            </div>
        </>
    )
}