export default function durFormat(ms)
{
	const dur = [];
	const durSec = Math.floor(ms / 1000);
	const hr = Math.floor(durSec / 60 / 60);
	const min = Math.floor(durSec / 60 % 60);
	const sec = Math.floor(durSec % 60);

	if (hr)
		dur.push(hr + " hr");
	if (min)
		dur.push(min + " min");
	if (!hr && sec)
		dur.push(sec + " sec");
	return (dur.join(" "));
}
