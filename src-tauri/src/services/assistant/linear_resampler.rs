use crate::constants::TARGET_SR;

pub struct LinearResampler;

impl LinearResampler {
    pub fn pcm_f32_to_le_bytes(samples: &[f32]) -> Vec<u8> {
        let mut bytes = Vec::with_capacity(samples.len() * 2);
        for &s in samples {
            let clamped = s.clamp(-1.0, 1.0);
            let sample = (clamped * i16::MAX as f32) as i16;
            bytes.extend_from_slice(&sample.to_le_bytes());
        }
        bytes
    }

    pub fn convert_audio(data: &[f32], channels: u16, sample_rate: u32) -> Vec<f32> {
        let mono: Vec<f32> = if channels > 1 {
            data.chunks(channels as usize)
                .map(|frame| frame.iter().sum::<f32>() / channels as f32)
                .collect()
        } else {
            data.to_vec()
        };

        let resampled = if sample_rate != TARGET_SR {
            LinearResampler::resample(&mono, sample_rate, TARGET_SR)
        } else {
            mono
        };

        resampled
    }

    fn resample(input: &[f32], from_rate: u32, to_rate: u32) -> Vec<f32> {
        if from_rate == to_rate || input.is_empty() {
            return input.to_vec();
        }

        let ratio = from_rate as f64 / to_rate as f64;
        let out_len = (input.len() as f64 / ratio).ceil() as usize;
        let mut output = Vec::with_capacity(out_len);

        for i in 0..out_len {
            let src_idx = i as f64 * ratio;
            let idx = src_idx as usize;
            let frac = src_idx - idx as f64;
            let s0 = input[idx.min(input.len() - 1)];
            let s1 = input[(idx + 1).min(input.len() - 1)];
            output.push(s0 + (s1 - s0) * frac as f32);
        }

        output
    }
}
