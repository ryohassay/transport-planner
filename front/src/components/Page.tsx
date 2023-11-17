import Station from "./Station";
import Transport from "./Transport";
import { ResultPageType } from "../types";

type PagePropsType = {
    page: ResultPageType,
    index: number,
}

const Page = ({ page, index }: PagePropsType) => {
    
    
    return (
        <div className="page">
            <div className="page-title">
                ルート {index + 1}
            </div>
            <div className="fare">
                運賃：{page.fare}円
            </div>

            <table className="route-table">
                <tbody>
                    {(() => {
                        const size: number = page.transports.length;
                        const rows = [];
                        for(let i = 0; i < size; i++){
                            rows.push(
                                <Station station={page.stations[i]} key={"st-" + i} />
                            );
                            rows.push(
                                <Transport transport={page.transports[i]} key={"tr-" + i} />
                            );
                        }

                        rows.push(
                            <Station station={page.stations[size]} key={"st-" + size} />
                        );

                        return rows;
                    })()}
                </tbody>
            </table>
        </div>
    );
};

export default Page;
