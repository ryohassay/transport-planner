import Row from "./Row";
import { ResultPageType } from "../types";

type PagePropsType = {
    page: ResultPageType
}

const Page = ({ page }: PagePropsType) => {
    
    
    return (
        <div className="page">
            <div className="fare">
                運賃：{page.fare}円
            </div>
            
            <table className="route-table">
                {(() => {
                    const size: number = page.transports.length;
                    const rows = [];
                    for(let i = 0; i < size; i++){
                        rows.push(
                            <Row station={page.stations[i]} transport={page.transports[i]} />
                        );
                    }

                    rows.push(
                        <Row station={page.stations[size]} />
                    );

                    return rows;
                })()}
            </table>
        </div>
    );
};

export default Page;
