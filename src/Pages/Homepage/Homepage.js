import React from 'react';
import classes from './Homepage.module.css';
import homeimage from '../../Assets/pug_placeholder.jpg';
import ProjectCard from '../../Components/ProjectCard/ProjectCard';
import WordcloudLogo from '../../Assets/WordcloudLogo.png';
import WSBLogo from '../../Assets/WSB_Logo.png';
import RedditLogo from '../../Assets/Reddit_Logo.png';

const Homepage = () => {
    return(
        <div className={classes.mainContainer}>
            <div className={classes.Header}>
                <h1>Hi. I'm Jason and this is my website.</h1>
            </div>
            <img className={classes.Photo} src={homeimage} alt={'Failed to load'}/>
            <div className={classes.Description}><p>I am currently employed as a data scientist 
                at Pitstop where I work on predictive analytics for vehicle maintenance. </p> </div>
            <div className={classes.projectCardContainer}><ProjectCard 
                    keyValue={0} 
                    Name='Twitter Wordcloud Generator' 
                    Logo={WordcloudLogo} 
                    Description='
                    This takes a search term (a few words), checks Twitter for popular tweets containing those words,
                    and compiles a wordcloud showing which words are associated with the search term
                    in tweets that are currently popular.'
                    orientLeft={true}
                    Link='/Twitter_Cloud'
                />
                <ProjectCard
                    keyValue={0}
                    Name='Subreddit Post Classifier'
                    Logo={RedditLogo}
                    Description='This takes a potential title for a
                        Reddit post and uses a TF-IDF and XGBoost based machine learning model to determine which Subreddit
                        that post would belong on.'
                    orientLeft={false}
                    Link='/Reddit_Classifier'
                />
                <ProjectCard
                    keyValue={0}
                    Name='WSB Analytics'
                    Logo={WSBLogo}
                    Description='A bunch of analytics on the popular online forum r/WallStreetBets, the alleged culprit
                    behind the 2021 GME run.'
                    orientLeft={true}
                    Link='/WSB_Analytics'
                />
            </div>
        </div>
    )
}

export default Homepage;
