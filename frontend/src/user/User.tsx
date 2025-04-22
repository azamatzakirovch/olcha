import {useState} from "react";
import "./User.css"
import demo_user_photo from "./../../public/user-account.png"
import speaker from './../../public/products/airpods-speaker.jpg'
import charging_area from './../../public/products/airpods-charger.jpg'
import productsData from "./../json-uploader/products.json"
import buy from "./../../public/buy.png"

import Footer from "./../footer/Footer.tsx"

const User = () => {

    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 10;
    const totalProducts = productsData.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const startIndex = currentPage * productsPerPage;
    const visibleProducts = productsData.slice(startIndex, startIndex + productsPerPage);

    return (
        <>
            <div className="navigation-bar">

                <div className="border-to-user-account">
                    <img src={demo_user_photo} alt="demo_user_photo" className="user-photo" />
                </div>

                <div className="border-for-menu-functions">
                    <div className="catalogue"

                    >
                        Catalogue
                    </div>



                    <div className="offices">
                        Offices
                    </div>

                    <div className="box">
                        Box
                    </div>

                    <div className="history">
                        History
                    </div>

                </div>

            </div>

            <div>
                <div className="top-good-of-week-border">
                    <div className="border-for-photo-of-top-good-left-side">
                        <img src={speaker} alt="speaker" className="photo-settings" />
                    </div>
                    <div className="border-for-photo-of-top-good-right-side">
                        <img src={charging_area} alt="charging_area" className="photo-settings" />
                    </div>

                    <div>
                        <div className="mini-circle" style={{
                            bottom: "130px",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}></div>

                        <div className="mini-rectangle" style={{
                            bottom: "50px",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}></div>

                        <div
                            style={{
                                position: "absolute",
                                bottom: "70px",
                                left: "620px",
                                fontFamily: "sans-serif",
                                color: "black",
                                fontSize: "40px",
                            }}
                        >
                            Air Pods 2.0
                        </div>

                        <div className="border-of-information-giver" >
                            <div className="mini-rectangle-hor" style={{
                                top: "50%",
                                right: "30px",
                                width: "290px",
                                transform: "translateY(-50%)",
                            }}></div>
                            <div className="mini-circle" style={{
                                top: "50%",
                                right: "20px",
                                transform: "translateY(-50%)",
                            }}></div>
                            <div className="mini-rectangle" style={{
                                top: "-10px",
                                left: "58px",
                                height: "50px",
                                rotate: "-45deg",
                            }}></div>
                        </div>

                        <div className="hover-text-left-side-top-side-top-good">
                            {"Sync with iPhone,\niPad and\nMacBook"}
                        </div>

                        <div className="hover-text-left-side-bottom-side-top-good">
                            {"Up To,\n24 hours\nBattery Life"}
                        </div>

                        <div className="hover-text-right-side-bottom-side-top-good">
                            {"Best Seller Product,\n⭐️⭐️⭐️⭐️⭐️(190)"}
                        </div>

                        <div className="hover-text-right-side-top-side-top-good">
                            {"Sound Up To,\n100 DB"}
                        </div>



                        <div className="border-of-information-giver" style={{
                            left: "30px",
                            // rotate: "-180deg",
                            transform: "scaleX(-1)"
                        }}>
                            <div className="mini-rectangle-hor" style={{
                                top: "50%",
                                right: "30px",
                                width: "290px",
                                transform: "translateY(-50%)",
                            }}></div>
                            <div className="mini-circle" style={{
                                top: "50%",
                                right: "20px",
                                transform: "translateY(-50%)",
                            }}></div>
                            <div className="mini-rectangle" style={{
                                top: "-10px",
                                left: "58px",
                                height: "50px",
                                rotate: "-45deg",
                            }}></div>
                        </div>

                        <div className="border-of-information-giver" style={{
                            left: "30px",
                            top: "30px",
                            transform: "scale(-1,-1)",
                        }}>
                            <div className="mini-rectangle-hor" style={{
                                top: "50%",
                                right: "30px",
                                width: "290px",
                                transform: "translateY(-50%)",
                            }}></div>
                            <div className="mini-circle" style={{
                                top: "50%",
                                right: "20px",
                                transform: "translateY(-50%)",
                            }}></div>
                            <div className="mini-rectangle" style={{
                                top: "-10px",
                                left: "58px",
                                height: "50px",
                                rotate: "-45deg",
                            }}></div>
                        </div>

                        <div className="border-of-information-giver" style={{
                            top: "17px",
                            transform: "scaleY(-1)",
                        }}>
                            <div className="mini-rectangle-hor" style={{
                                top: "50%",
                                right: "30px",
                                width: "290px",
                                transform: "translateY(-50%)",
                            }}></div>
                            <div className="mini-circle" style={{
                                top: "50%",
                                right: "20px",
                                transform: "translateY(-50%)",
                            }}></div>
                            <div className="mini-rectangle" style={{
                                top: "-10px",
                                left: "58px",
                                height: "50px",
                                rotate: "-45deg",
                            }}></div>
                        </div>
                    </div>
                </div>

                <div className="border-to-filtering-elements">
                    <button className="filter-button">Sales</button>
                    <button className="filter-button">Seasonal Favorites</button>
                    <button className="filter-button">Best Selling Products</button>
                    <button className="filter-button">Limited Time Products</button>
                    <button className="filter-button">New Arrival Products</button>
                </div>
            </div>

                <div className="product-gallery-container">
                    <div className="product-grid-5x2">

                        {visibleProducts.map((product, index) => (
                            <div key={index} className="product_template_border">
                                <div className="product-photo-border">
                                    <img src={product.photo} alt={product.name} className="product-photo-settings" />
                                </div>
                                <div className="border-for-name">
                                    <div
                                        className="name-parameters"
                                    >
                                        {product.name}
                                    </div>
                                </div>

                                <div className="border-for-star">
                                    <div className="star-parameters">
                                        {"⭐️ " + product.star + "(" + product.comments + " comments)"}
                                    </div>
                                </div>


                                <div className="border-price">
                                    <div className="price-parameters">{product.price} sum</div>
                                </div>
                                <div className="buy-button">
                                    <img className="buy-parameters" src={buy} alt="buy-parameters" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="gallery-buttons">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                                disabled={currentPage === 0}
                            >
                                ⬅ Back
                            </button>
                            <span style={{ margin: "0 12px" }}>Page {currentPage + 1} of {totalPages}</span>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                                disabled={currentPage === totalPages - 1}
                            >
                                Next ➡
                            </button>
                        </div>
                    )}
                </div>
            <Footer />

        </>
    )
}

export default User