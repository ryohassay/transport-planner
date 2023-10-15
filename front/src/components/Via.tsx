import { ViaPropsType, ViaListType } from "../types";


const Via = ({ viaCount, setViaCount, vias, setVias }: ViaPropsType) => {
    const addVia = () => {
        setViaCount((prevValue) => prevValue + 1);
    };

    const setVia = (vias: ViaListType, index: number, value: string) => {
        const newVias = vias.map((via, i) => {
            if(i === index) {
                // Change the value (via)
                return value;
            } 
            else {
                // The rest haven't changed
                return via;
            }
        });
        setVias(newVias);
    }
    
    return (
        <div>
            <ul className="via">
                {
                    Array.from({length: viaCount}, (_, index) => {
                        return (
                            <li key={index}>
                                <dl>
                                    <dt>経由{index + 1}</dt>
                                    <dd><input type="text" name={"via" + index} placeholder="経由地" onChange={e => setVia(vias, index, e.target.value)}/></dd>
                                </dl>
                            </li>
                        );
                    })
                }
            </ul>
            
            <button type="button" onClick={addVia} disabled={viaCount >= 3}>経由地を追加</button>
        </div>
        
        
    );
};

export default Via;
