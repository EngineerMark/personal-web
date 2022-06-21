import { Button, Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Moment from "react-moment";


function SectionGithub() {
    const [githubData, setGithubData] = useState(null);
    const [githubUser] = useState("EngineerMark");

    async function fetchData() {
        await fetch(`https://api.github.com/users/${githubUser}/repos`)
            .then((response) => response.json())
            .then(async (data) => {
                data.sort((a, b) => {
                    return ((a.pushed_at < a.updated_at) ?
                        (a.pushed_at === b.pushed_at) ? 0 : ((a.pushed_at > b.pushed_at ? -1 : 1)) :
                        (a.updated_at === b.updated_at) ? 0 : ((a.updated_at > b.updated_at ? -1 : 1)));
                });

                data = data.slice(0, 5);

                for (const repo of data) {
                    await fetch(repo.events_url).then((_response) => _response.json()).then((_data) => {
                        repo.events = _data.slice(0, 5);
                    });
                }
                setGithubData(data);
            }
            );
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        githubData ? <>
            < div >
                <h3>Activity</h3>
                {
                    githubData.map(repo => (
                        repo.events && repo.events.length > 0 ?
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        <Button variant="contained">{repo.full_name}</Button>
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {
                                            (
                                                () => {
                                                    switch (repo.events[0].type) {
                                                        case "CreateEvent":
                                                            return (<p>Created repository</p>);
                                                        case "ForkedEvent":
                                                            return (<p>Forked repository</p>);
                                                        case "PushEvent":
                                                            return <GithubPushEvent event={repo.events[0]} />
                                                        case "IssuesEvent":
                                                            return <GithubIssuesEvent event={repo.events[0]} />;
                                                        case "PublicEvent":
                                                            return <GithubPublicEvent event={repo.events[0]} />
                                                        default:
                                                            return (<p>Updated repository</p>);
                                                    }
                                                }
                                            )()
                                        }
                                    </Typography>
                                    <Typography>
                                        <p><Moment fromNow>{repo.events[0].created_at}</Moment></p>
                                    </Typography>
                                </CardContent>
                            </Card> : <></>
                    ))
                }
            </div >
        </> : <></>
    );
}

export default SectionGithub;

function GithubPublicEvent(props) {
    return (
        <p>Made repository public</p>
    )
}

function GithubPushEvent(props) {
    return (
        <>
            <p>Pushed <Button variant="outlined" href={"https://github.com/" + props.event.repo.name + "/commit/" + props.event.payload.commits[0].sha} target="_blank" rel="noreferrer">{props.event.payload.commits[0].sha.slice(0, 7)}</Button> on branch <i>{props.event.payload.ref}</i></p>
            <p class="text-xs">Description: {props.event.payload.commits[0].message}</p>
        </>
    )
}

function GithubIssuesEvent(props) {
    return (
        <>
            {props.event.payload.action.charAt(0).toUpperCase() + props.event.payload.action.slice(1)} issue <Button variant="outlined" href={props.event.payload.issue.html_url} target="_blank" rel="noreferrer">{props.event.payload.issue.title}</Button>
        </>
    )
}