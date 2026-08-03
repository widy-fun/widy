!macro NSIS_HOOK_POSTINSTALL
  ; Check if VC++ Redistributable 2015-2022 x64 is installed
  ReadRegDWord $0 HKLM "SOFTWARE\Microsoft\VisualStudio\14.0\VC\Runtimes\x64" "Installed"
  ${If} $0 == 1
    DetailPrint "Visual C++ Redistributable is already installed"
    Goto vcredist_done
  ${EndIf}

  DetailPrint "Downloading Visual C++ Redistributable..."
  NSISdl::download "https://aka.ms/vs/17/release/vc_redist.x64.exe" "$TEMP\vc_redist.x64.exe"
  Pop $0 ; result: "success" or an error message

  ${If} $0 == "success"
    DetailPrint "Installing Visual C++ Redistributable..."
    ExecWait '"$TEMP\vc_redist.x64.exe" /install /quiet /norestart' $1
    ${If} $1 != 0
      DetailPrint "Warning: VC++ Redistributable installation completed with exit code $1"
    ${EndIf}
    Delete "$TEMP\vc_redist.x64.exe"
  ${Else}
    DetailPrint "Failed to download VC++ Redistributable: $0"
    MessageBox MB_ICONEXCLAMATION "Failed to download the Visual C++ Redistributable. Please install it manually from https://aka.ms/vs/17/release/vc_redist.x64.exe, otherwise the application may not start."
  ${EndIf}

  vcredist_done:
!macroend

!macro NSIS_HOOK_PREINSTALL
!macroend

!macro NSIS_HOOK_PREUNINSTALL
!macroend

!macro NSIS_HOOK_POSTUNINSTALL
!macroend