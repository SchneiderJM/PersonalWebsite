import React from 'react';
import classes from './Homepage.module.css';
import homeimage from '../../Assets/pug_placeholder.jpg';
import ProjectCard from '../../Components/ProjectCard/ProjectCard';
import WordcloudLogo from '../../Assets/WordcloudLogo.png';

const Homepage = () => {
    return(
        <div className={classes.mainContainer}>
            <div className={classes.Header}>
                <h1>Hi. I'm Jason and this is my website.</h1>
            </div>
            <img className={classes.Photo} src={homeimage} alt={'Failed to load'}/>
            <div className={classes.Description}><p>I am currently employed as a data scientist 
                at Rattlehub Digital where I work on predictive insights models for financial advisors
                as well as digital engagement for collection of estate data. </p> </div>
            <div className={classes.projectCardContainer}><ProjectCard 
                    keyValue={0} 
                    Name='Twitter Wordcloud Generator' 
                    Logo={WordcloudLogo} 
                    Description='This is a small web app. 
                    It takes a search term, checks Twitter for popular tweets containing that term, 
                    and compiles a wordcloud showing which words are associated with the search term 
                    in popular tweets.' 
                    orientLeft={true}
                    Link='/Twitter_Cloud'
                />
                <ProjectCard
                    keyValue={0}
                    Name='Subreddit Post Classifier'
                    Logo={WordcloudLogo}
                    Description='This takes a search term to function as a potential title for a Reddit post and
                        uses a TF-IDF and XGBoost based machine learning model to determine on which Subreddit
                        such a post would best fit.'
                    orientLeft={false}
                    Link='/Reddit_Classifier'
                />
                <ProjectCard
                    keyValue={0}
                    Name='WSB Analytics'
                    Logo={WordcloudLogo}
                    Description='A bunch of analytics on the popular online forum r/WallStreetBets, an alleged culprit
                    behind the 2021 GME run'
                    orientLeft={true}
                    Link='/WSB_Analytics'
                />
            </div>
        </div>
    )
}

export default Homepage;
