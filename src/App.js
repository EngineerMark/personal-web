import React from "react";
import Moment from 'react-moment';
import {useEffect, useState} from 'react';
import { Helmet } from "react-helmet";
import './App.css';

function App() {
  const [githubData, setGithubData] = useState(null);
  const [githubUser, setGithubUser] = useState("EngineerMark");

  async function fetchData(){
    await fetch(`https://api.github.com/users/${githubUser}/repos`)
      .then((response) => response.json())
      .then(async (data) => {
        data.sort((a,b)=>{
          return ((a.pushed_at<a.updated_at)?
            (a.pushed_at==b.pushed_at)?0:((a.pushed_at>b.pushed_at?-1:1)):
            (a.updated_at==b.updated_at)?0:((a.updated_at>b.updated_at?-1:1)));
        });

        data = data.slice(0,5);

        for(const repo of data){
          await fetch(repo.events_url).then((_response)=> _response.json()).then((data)=>{
            repo.events = data.slice(0,5);
          });
        }
        setGithubData(data);
        }
      );
  }

  const socials = {
    twitter: "https://twitter.com/id2amayakase",
    github: "https://github.com/"+githubUser,
    youtube: "https://www.youtube.com/c/Amayakase",
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>DarkChii</title>
      </Helmet>
      <div class="md:container md:mx-auto mt-4 text-center">
        <div>
          <img class="rounded-full shadow-lg mb-6 mx-auto max-w-sm" src="./chii.png" />
        </div>
        <div>
          <div class="mx-auto max-w-4xl rounded-3xl bg-gray-600 p-20 text-center">
            <h2 class="text-5xl font-bold leading-tight text-white">Dark Chii</h2>
            <p class="mt-5 text-xl leading-8 text-white">Personal repository and general info website</p>
            <div class="mt-6 flex items-center justify-center gap-4">
              <a href={socials.youtube} rel="noreferrer" target="_blank" class="hover:bg-[#ff0000] bg-transparent transition-all p-2 font-semibold text-white inline-flex items-center space-x-2 rounded-full">
                <svg class="w-5 h-5 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
              </a>
              <a href={socials.twitter} rel="noreferrer" target="_blank" class="hover:bg-blue-400 bg-transparent transition-all p-2 font-semibold text-white inline-flex items-center space-x-2 rounded-full">
                <svg class="w-5 h-5 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
              </a>
              <a href={socials.github} rel="noreferrer" target="_blank" class="hover:bg-[#6e5494] bg-transparent transition-all p-2 font-semibold text-white inline-flex items-center space-x-2 rounded-full">
                <svg class="w-5 h-5 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </a>
            </div>
            <div class="text-left">
              {githubData?<>
                <div class="mt-8">
                  <p class="text-xl text-white">Development Activity</p>
                  <div>
                    {
                      githubData.map(repo=>(
                        repo.events&&repo.events.length>0?
                          <div class="flex justify-center mt-4 mb-4">
                            <div class="block p-6 rounded-lg shadow-lg bg-white w-full">
                              <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">{repo.full_name}</h5>
                              <p class="text-gray-700 text-base mb-4">
                                {
                                  (
                                    ()=>{
                                      switch(repo.events[0].type){
                                        case "CreateEvent":
                                          return "Created repository";
                                        case "ForkedEvent":
                                          return "Forked repository";
                                        case "PushEvent":
                                          return <GithubPushEvent event={repo.events[0]} />
                                        case "IssuesEvent":
                                          return <GithubIssuesEvent event={repo.events[0]} />;
                                        case "PublicEvent":
                                          return <GithubPublicEvent event={repo.events[0]} />
                                        default:
                                          return "Updated repository";
                                      }
                                    }
                                  )()
                                }
                              </p>
                              <p><Moment fromNow>{repo.events[0].created_at}</Moment></p>
                            </div>
                          </div>:<></>
                      ))
                    }
                  </div>
                </div>
              </>:null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

function GithubPublicEvent(props){
  return (
    <>Made repository public</>
  )
 }

function GithubPushEvent(props){
  return (
    <>
      <p>Pushed <a class="text-xs inline-block py-1 px-1 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 hover:bg-blue-800 text-white rounded" href={"https://github.com/"+props.event.repo.name+"/commit/"+props.event.payload.commits[0].sha} target="_blank" rel="noreferrer">{props.event.payload.commits[0].sha.slice(0,7)}</a> on branch <span class="text-xs inline-block py-1 px-1 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 hover:bg-blue-800 text-white rounded">{props.event.payload.ref}</span></p>
      <p class="text-xs">Description: {props.event.payload.commits[0].message}</p>
    </>
  )
}

function GithubIssuesEvent(props){
  return (
    <>
      {props.event.payload.action.charAt(0).toUpperCase() + props.event.payload.action.slice(1)} issue <a class="text-xs inline-block py-1 px-1 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 hover:bg-blue-800 text-white rounded" href={props.event.payload.issue.html_url} target="_blank" rel="noreferrer">{props.event.payload.issue.title}</a>
    </>
  )
}