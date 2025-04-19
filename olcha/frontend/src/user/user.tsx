// import MenuBar from "./../mostly-used-tools/menu-bar/menu-bar.tsx"
// import user from "./../system-photos/menu-bar/azamatzakirovch.jpg"
// import "./user.css"
// import AirPoods from "./../datasets/besprovodnye-naushniki-apple-airpods.jpg"
//
// function User() {
//
//
//     return (
//         <>
//             <MenuBar />
//             <div>
//                 <div className="mini-box-for-username-login-user-photo">
//                     <div className="name">Azamat Zakirovch</div>
//                     <div className="username">@azamatzakirovch</div>
//                     <img src={user} alt="User Photo" className="profile-settings"/>
//                 </div>
//
//                 <div className="popular-goods-container">
//                     <div className="border-of-photo">
//                         <img src={AirPoods} alt="top" className="photo-of-top-good"/>
//                     </div>
//
//                     <div className="border-of-name-of-top-good">
//                         <div className='the-name-of-top-good'>AirPods 2.0</div>
//                     </div>
//
//                     <div className="border-of-the-description-of-top-good">
//                         <div className='the-description-of-top-good'>
//                             Experience superior sound quality
//                             with Active Noise Cancellation,
//                             Transparency Mode, and a customisable
//                             fit for all-day comfort.
//                         </div>
//                     </div>
//
//
//                     <div className='the-old-price-of-the-good'>
//                         400'000
//                     </div>
//                     <div className='the-new-price-of-the-good'>
//                         250'000
//                     </div>
//                 </div>
//
//                 <div className="border-of-tool-for-filtering">
//
//                     <div className="other-catalogs-sales">
//                         <div className='txt-settings'>Sales</div>
//                     </div>
//
//                     <div className="other-catalogs-seasonal-favourites">
//                         <div className='txt-settings'>Seasonal Favourites</div>
//                     </div>
//
//                     <div className="other-catalogs-best-selling-products2">
//                         <div className='txt-settings'>Best Selling Products</div>
//                     </div>
//
//                     <div className="other-catalogs-limited-time-products">
//                         <div className='txt-settings'>Limited Time Products</div>
//                     </div>
//
//                     <div className="other-catalogs-new-arrival-products">
//                         <div className='txt-settings'>New Arrival Products</div>
//                     </div>
//
//                 </div>
//
//             </div>
//
//
//
//         </>
//     );
// }
//
// export default User;

import { useState } from "react";
import MenuBar from "./../mostly-used-tools/menu-bar/menu-bar.tsx";
import user from "./../system-photos/menu-bar/azamatzakirovch.jpg";
import "./user.css";
import AirPoods from "./../datasets/besprovodnye-naushniki-apple-airpods.jpg";

const TOTAL_RECTANGLES = 50;
const RECTANGLES_PER_PAGE = 20;

function User() {
    const [page, setPage] = useState(0);
    const startIndex = page * RECTANGLES_PER_PAGE;
    const endIndex = startIndex + RECTANGLES_PER_PAGE;

    const rectangles = Array.from({ length: TOTAL_RECTANGLES }, (_, i) => i + 1);
    const paginatedRectangles = rectangles.slice(startIndex, endIndex);
    const totalPages = Math.ceil(TOTAL_RECTANGLES / RECTANGLES_PER_PAGE);

    return (
        <>
            <MenuBar />
            <div>
                {/* User Info */}
                <div className="mini-box-for-username-login-user-photo">
                    <div className="name">Azamat Zakirovch</div>
                    <div className="username">@azamatzakirovch</div>
                    <img src={user} alt="User Photo" className="profile-settings" />
                </div>

                {/* Featured Product (AirPods) */}
                <div className="popular-goods-container">
                    <div className="border-of-photo">
                        <img src={AirPoods} alt="top" className="photo-of-top-good" />
                    </div>

                    <div className="border-of-name-of-top-good">
                        <div className="the-name-of-top-good">AirPods 2.0</div>
                    </div>

                    <div className="border-of-the-description-of-top-good">
                        <div className="the-description-of-top-good">
                            Experience superior sound quality with Active Noise Cancellation,
                            Transparency Mode, and a customisable fit for all-day comfort.
                        </div>
                    </div>

                    <div className="the-old-price-of-the-good">400'000</div>
                    <div className="the-new-price-of-the-good">250'000</div>
                </div>

                {/* Rectangle Product Grid */}
                <div className="products-grid-wrapper">
                    {paginatedRectangles.map((num) => (
                        <div key={num} className="rectangle-template">
                            Rectangle {num}
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="pagination">
                    <button disabled={page === 0} onClick={() => setPage(page - 1)}>← Prev</button>
                    <span>Page {page + 1} / {totalPages}</span>
                    <button disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>Next →</button>
                </div>

                {/* Filter Buttons */}
                <div className="border-of-tool-for-filtering">
                    <div className="other-catalogs-sales"><div className="txt-settings">Sales</div></div>
                    <div className="other-catalogs-seasonal-favourites"><div className="txt-settings">Seasonal Favourites</div></div>
                    <div className="other-catalogs-best-selling-products2"><div className="txt-settings">Best Selling Products</div></div>
                    <div className="other-catalogs-limited-time-products"><div className="txt-settings">Limited Time Products</div></div>
                    <div className="other-catalogs-new-arrival-products"><div className="txt-settings">New Arrival Products</div></div>
                </div>
            </div>
        </>
    );
}

export default User;
