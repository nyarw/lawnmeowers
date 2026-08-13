# Lawn Meowers Council

## How to add yourself to the website

## 1. Add your avatar (optional)

In the `public/avatars` directory, upload your avatar, named after the username in the JSON file:

```text
public/avatars/username.png
```

Supported formats: `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`.

## 2. Add yourself to the JSON

Open `src/data/profiles.json` and add your profile to the array:

```json
{
	"username": "example",
	"displayName": "Example",
	"bio": "meow :3",
	"roles": ["Member"],
	"discordId": "",
	"showPresence": true,
	"socials": [
		{
			"platform": "roblox",
			"handle": "example",
			"url": ""
		},
		{
			"platform": "",
			"handle": "",
			"url": ""
		}
	]
}
```

If you don't want to add socials:
```json
"socials": []
```

Currently supported socials: `discord`, `github`, `roblox`, `spotify`, `website`, `youtube`.
