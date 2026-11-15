import yaml
from pathlib import Path

with open("fancy_website/_data/talks.yml", "r", encoding="utf-8") as file:
	talks = yaml.safe_load(file)

for talk in talks:
	#print(talk) # DEBUG
	if(talk.get("abstract") is None): continue # For future talks.
	
	date = talk["date"].strftime("%Y/%m/%d")
	time = talk["time"]
	speakers = ", ".join(f'**{s["name"]}** ({s["affiliation"]})' for s in talk["speakers"])
	title = talk["title"]
	video = f'[video]({talk["video"]})' if(talk.get("video") is not None) else ""
	slides = f'[slides]({talk["slides"]})' if((talk.get("slides") is not None) and Path(talk["slides"]).is_file()) else ""
	abstract = talk.get("abstract", "").strip().replace("\n", " ")

	# Outputs.
	print(f"- {date} {time}: {speakers}  ")
	print(f"  Title: **{title}**  ")
	if(video): print(f"  {video}  ")
	if(slides): print(f"  {slides}  ")
	print(f"  Abstract: *{abstract}*")
	#print()
