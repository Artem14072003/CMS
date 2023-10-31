
import Price from "../../../../../../../UI/Price.tsx";
import {ITrContact} from "../../../../../../../assets/ts/interface.ts";
import {url} from "../../../poppap/update-popapp/UpdatePopapp.tsx";

const TrContact = ({category, count, mutate, image, discount, id, price, title, units, fetchDate}:ITrContact) => {

    return (
        <tr className="contact">
            <td>{id}</td>
            <td>{title}</td>
            <td>{category}</td>
            <td>{units}</td>
            <td>{count}</td>
            <td>
                <Price price={
                    discount !== 0 ?
                        price - ((discount / 100) * price) :
                        price
                }/>
            </td>
            <td className="price">
                <Price price={
                    discount !== 0 ?
                        (price - ((discount / 100) * price)) * count :
                        (price * count)
                }/>
            </td>
            <td className="icons">
                <div className="navButton">
                    {image !== "image/notimage.jpg" ? (
                        <button onClick={() => location.href = url+image} className={`page`}/>
                    ) : (
                        <button disabled className={`not_page`}/>
                    )}

                    <button className="edit" onClick={() =>fetchDate(id)}/>
                    <button className="del" onClick={() => mutate(id)}/>
                </div>
            </td>
        </tr>
    )
};

export default TrContact;