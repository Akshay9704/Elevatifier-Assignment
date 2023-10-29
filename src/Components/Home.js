import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Spinner from 'react-bootstrap/Spinner';

const Home = () => {
    const [articles, setArticles] = useState([]); // Add articles state
    const [selectedCategory, setSelectedCategory] = useState("All"); // Add selectedCategory state
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state

    async function getArticles() {
        try {
            const getData = await axios.get('https://linesnews.onrender.com/api/news-datas'); // Fetch data from the API
            const res = await getData.data; // Store the data in the articles state
            setArticles(res.data); // Store the data in the articles state
            setIsLoading(false); // Set isLoading to false after data is loaded
        } catch (error) {
            console.error('Error fetching data:', error); // If there is an error fetching data, console log the error
            setIsLoading(false); // Make sure to set isLoading to false in case of an error too
        }
    }

    useEffect(() => { // Call getArticles() when the component is first rendered
        getArticles();
    }, []);

    function filterArticles(category) { // Filter articles based on the selected category
        if (category === "All") {
            return articles; // Show all articles
        } else {
            return articles.filter((article) => article.attributes.category === category);
        }
    }

    // Get all the categories from the articles state
    const categories = Array.from(new Set(articles.map(article => article.attributes.category)));
    // Create a dynamic heading based on the selected category
    const headingText = selectedCategory === "All" ? "Top Headlines" : `${selectedCategory}`;

    return (
        <div>
            <div className='heading'>
                <h1 className='heading_text'>News App - {headingText}</h1>
                {/* Render the headingText variable in the h1 tag */}
            </div>
            <div className='categories'>
                <Nav>
                    <Nav.Link onClick={() => setSelectedCategory("All")}>All</Nav.Link>
                    <NavDropdown title="Categories" id="basic-nav-dropdown">
                        {categories.map((category) => ( // Map through the categories array and render a NavDropdown.Item for each category
                            <NavDropdown.Item key={category} onClick={() => setSelectedCategory(category)}>
                                {category}
                            </NavDropdown.Item>
                        ))}
                    </NavDropdown>
                </Nav>
            </div>
            {isLoading ? ( // Conditionally render the spinner when isLoading is true
                <div className='spinner-container'>
                    <Spinner animation="border" variant="dark" />
                </div>
            ) : (
                <div className='news'>
                    {/* Map through the articles array and render a Card for each article */}
                    {filterArticles(selectedCategory).map((article) => (
                        <Card className='news_card' style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={article.attributes.newsIcon} />
                            <Card.Body>
                                <Card.Title>{article.attributes.headline}</Card.Title>
                                <Card.Text>
                                    <div className='card_text'>
                                        <p className='card_text_p'>Source:</p>{article.attributes.newsSource}
                                    </div>
                                    <div className='card_hashtags'>
                                        {article.attributes.hashtags.split(',').map((hashtag, i) => (
                                            <span className='hashtags' key={i}>#{hashtag.trim()} </span>
                                        ))}
                                    </div>
                                </Card.Text>
                                <Button variant="warning">Read More</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;

