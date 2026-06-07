@echo off
setlocal enabledelayedexpansion

echo ======================================================
echo    味道星球 - 智能食谱生成系统 (后端一键启动工具)
echo ======================================================
echo.

:: 检查 Python 启动器
where py >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 未在系统上找到 'py' (Python Launcher)。
    echo 请确保安装了 Python 并选中了 "Add to PATH"。
    pause
    exit /b
)

echo [1/3] 正在检查环境依赖...
py -m pip install flask flask-cors >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [警告] 自动安装依赖失败。
    echo 请尝试手动运行: pip install flask flask-cors
) else (
    echo [成功] 依赖检查完成。
)

echo.
echo [2/3] 正在启动后端服务...
echo 提示: 服务启动后，请保持此窗口开启。
echo.

:: 启动服务并检查是否报错
py app.py

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [错误] 后端服务异常退出。
    pause
)
