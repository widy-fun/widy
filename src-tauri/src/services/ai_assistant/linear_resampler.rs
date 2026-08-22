use crate::{constants::TARGET_SR, error::AppError};
use rubato::{
    Async, FixedAsync, SincInterpolationParameters, SincInterpolationType, WindowFunction,
};

pub struct LinearResampler {}

impl LinearResampler {
    pub fn new() -> Self {
        Self {}
    }

    pub fn stereo_to_mono(data: &[f32], channels: usize) -> Vec<f32> {
        if channels <= 1 {
            return data.to_vec();
        }

        data.chunks_exact(channels)
            .map(|frame| frame.iter().sum::<f32>() / channels as f32)
            .collect()
    }

    pub fn stereo_i16_to_mono(data: &[i16], channels: usize) -> Vec<f32> {
        data.chunks(channels)
            .map(|frame| {
                let sum: f32 = frame.iter().map(|x| *x as f32 / 32768.0).sum();

                sum / channels as f32
            })
            .collect()
    }

    pub fn stereo_u16_to_mono(data: &[u16], channels: usize) -> Vec<f32> {
        data.chunks(channels)
            .map(|frame| {
                let sum: f32 = frame.iter().map(|x| (*x as f32 - 32768.0) / 32768.0).sum();

                sum / channels as f32
            })
            .collect()
    }

    pub fn create_resampler(input_sr: u32) -> Result<Async<f32>, AppError> {
        if input_sr == 0 {
            return Err(AppError::Custom("Input sample rate".to_string()));
        }
        let ratio = TARGET_SR as f64 / input_sr as f64;

        let params = SincInterpolationParameters {
            sinc_len: 128,
            f_cutoff: Some(0.95),
            interpolation: SincInterpolationType::Linear,
            oversampling_factor: 256,
            window: WindowFunction::BlackmanHarris2,
        };

        Ok(Async::<f32>::new_sinc(
            ratio,
            2.0,
            &params,
            1024,
            1,
            FixedAsync::Input,
        )?)
    }
}
