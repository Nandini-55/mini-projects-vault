import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./InfoBox.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import CloudIcon from "@mui/icons-material/Cloud";
import ListItemIcon from "@mui/material/ListItemIcon";
const weatherImages = {
  Thunderstorm:
    "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Drizzle:
    "https://images.unsplash.com/photo-1623925226045-be7b15b368a3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Rain: "https://images.unsplash.com/photo-1620385020302-3d25c3642043?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Snow: "https://plus.unsplash.com/premium_photo-1663090593977-9923cc536f3b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Clear:
    "https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Clouds:
    "https://images.unsplash.com/photo-1591552265137-99c59d9f4927?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Atmosphere:
    "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  defualt:
    "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?q=80&w=775&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};
export default function InfoBox({ info }) {
  return (
    <>
      {info.cityName != undefined && info.cityName.length != 0 && (
        <div>
          <h1 style={{fontFamily:"sans-serif"}}>WeatherInfo</h1>
          <Card sx={{ minWidth: 400, maxWidth: 445 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <LocationOnIcon />
                {info.cityName}
                {info.state && info.state != info.cityName
                  ? `,${info.state}`
                  : ""}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              alt="Weather icon"
              height="140"
              image={weatherImages[info.main]||weatherImages.default}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {info.temp}&deg;C &nbsp;{" "}
                {info.weather
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
                <img
                  style={{
                    height: "2rem",
                    objectFit: "cover",
                    width: "4rem",
                    objectPosition: "center",
                    transform: "scale(1.1)",
                  }}
                  src={info.icon}
                />
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                component="span"
              >
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  className="data"
                >
                  <ListItem
                    key={info.feelsLike}
                    disableGutters
                    secondaryAction={
                      <ListItemIcon>
                        <DeviceThermostatIcon />
                      </ListItemIcon>
                    }
                    className="listItem"
                  >
                    <ListItemText
                      primary={`Feels Like =  ${info.feelsLike}\u00B0C`}
                    />
                  </ListItem>
                  <ListItem
                    key={info.humidity}
                    disableGutters
                    secondaryAction={
                      <ListItemIcon>
                        <WaterDropIcon />
                      </ListItemIcon>
                    }
                    className="listItem"
                  >
                    <ListItemText primary={`Humidity =  ${info.humidity}`} />
                  </ListItem>
                  <ListItem
                    key={info.tempMin / 2 - 2}
                    disableGutters
                    secondaryAction={
                      <ListItemIcon>
                        <CloudIcon />
                      </ListItemIcon>
                    }
                    className="listItem"
                  >
                    <ListItemText
                      primary={`Min Temp =  ${info.tempMin}\u00B0C`}
                    />
                  </ListItem>
                  <ListItem
                    key={info.tempMax}
                    disableGutters
                    secondaryAction={
                      <ListItemIcon>
                        <CloudQueueIcon />
                      </ListItemIcon>
                    }
                    className="listItem"
                  >
                    <ListItemText
                      primary={`Max Temp =  ${info.tempMax}\u00B0C`}
                    />
                  </ListItem>
                </List>
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
