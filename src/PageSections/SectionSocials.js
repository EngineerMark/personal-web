import { Button } from "@mui/material";
import { Box } from "@mui/system";
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';

function SectionSocials() {
    const socials = {
        twitter: "https://twitter.com/id2amayakase",
        github: "https://github.com/EngineerMark",
        youtube: "https://www.youtube.com/c/Amayakase",
    };

    return (
        <div>
            <h3>Socials</h3>
            <Box>
                <Button href={socials.twitter} target="_blank">
                    <TwitterIcon />
                </Button>
                <Button href={socials.github} target="_blank">
                    <GitHubIcon />
                </Button>
                <Button href={socials.youtube} target="_blank">
                    <YouTubeIcon />
                </Button>
            </Box>
        </div>
    );
}

export default SectionSocials;