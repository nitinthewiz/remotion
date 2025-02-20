import React from 'react';
import {Player} from '@remotion/player';
import {Audio, prefetch, staticFile} from 'remotion';
import {useState} from 'react';
import {preloadAudio} from '@remotion/preload';

const Comp1: React.FC<{
	audioSrc: string;
}> = ({audioSrc}) => {
	return <Audio src={audioSrc}></Audio>;
};

const Comp2: React.FC<{
	audioSrc: string;
}> = ({audioSrc}) => {
	return <Audio src={audioSrc}></Audio>;
};

const templateCompositions = {
	FirstComp: Comp1,
	SecondComp: Comp2,
};

export default function ErrorRemake() {
	const [activeCompositionId, setActiveCompositionId] =
		useState<string>('FirstComp');
	const [audioUrl, setAudioUrl] = useState(
		'https://file-examples.com/storage/feeb72b10363daaeba4c0c9/2017/11/file_example_MP3_2MG.mp3'
	);

	if (activeCompositionId === 'ThirdComp') {
		return null;
	}

	return (
		<div>
			<div>
				<label htmlFor="composition">Composition</label>
				<select
					name="composition"
					id="composition"
					onChange={(e: any) => {
						setActiveCompositionId(e.target.value);
					}}
				>
					<option value="FirstComp">Composition 0</option>
					<option value="SecondComp">Composition 1</option>
					<option value="ThirdComp">Nothing</option>
				</select>
			</div>

			<div>
				<label htmlFor="audio">Audio</label>
				<select
					name="audio"
					id="audio"
					onChange={(e: any) => {
						prefetch(e.target.value)
							.waitUntilDone()
							.then(() => {
								setAudioUrl(e.target.value);
							});
					}}
				>
					<option value={staticFile('sample.mp3')}>Audio 0</option>
					<option value={staticFile('sample2.mp3')}>Audio 1</option>
					<option value={staticFile('sample3.mp3')}>Audio 2</option>
				</select>
			</div>

			<div>
				<Player
					component={templateCompositions[activeCompositionId]}
					inputProps={{
						audioSrc: audioUrl,
					}}
					durationInFrames={2000}
					compositionWidth={1920}
					compositionHeight={1080}
					fps={30}
					controls
					allowFullscreen={false}
				/>
			</div>
		</div>
	);
}
