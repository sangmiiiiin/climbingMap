import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  InputAdornment, 
  IconButton,
  Alert,
  Divider,
  CircularProgress
} from '@mui/material'
import { 
  Email, 
  Lock, 
  Visibility, 
  VisibilityOff,
  Google
} from '@mui/icons-material'
import { useAuth } from '../../../hooks/useAuth'

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [generalError, setGeneralError] = useState('')
  
  const { login } = useAuth()

  // Email validation regex pattern
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  // Password validation function
  const validatePassword = (password) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasNonalphas = /\W/.test(password)
    
    if (password.length < minLength) {
      return '비밀번호는 8자 이상이어야 합니다'
    }
    if (!hasUpperCase) {
      return '대문자를 포함해야 합니다'
    }
    if (!hasLowerCase) {
      return '소문자를 포함해야 합니다'
    }
    if (!hasNumbers) {
      return '숫자를 포함해야 합니다'
    }
    if (!hasNonalphas) {
      return '특수문자를 포함해야 합니다'
    }
    return true
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty, touchedFields, dirtyFields },
    watch,
    trigger,
    clearErrors
  } = useForm({
    mode: 'onChange', // Real-time validation
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data) => {
    setLoading(true)
    setGeneralError('')
    
    try {
      const result = await login(data)
      if (result.success) {
        // 로그인 성공 시 처리 (예: 홈으로 이동)
        console.log('로그인 성공')
      } else {
        setGeneralError(result.error || '로그인에 실패했습니다.')
      }
    } catch (error) {
      setGeneralError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setGeneralError('')
    try {
      // Google 로그인 로직 구현 예정
      console.log('Google 로그인 시도')
    } catch (error) {
      setGeneralError('Google 로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleKakaoLogin = async () => {
    setLoading(true)
    setGeneralError('')
    try {
      // Kakao 로그인 로직 구현 예정
      console.log('Kakao 로그인 시도')
    } catch (error) {
      setGeneralError('Kakao 로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit(onSubmit)} 
      sx={{ 
        width: '100%',
        maxWidth: { xs: '100%', sm: '400px' },
        mx: 'auto',
        px: { xs: 2, sm: 0 }
      }}
    >
      {/* Error Alert */}
      {generalError && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {generalError}
        </Alert>
      )}

      {/* Email Field */}
      <Controller
        name="email"
        control={control}
        rules={{
          required: '이메일을 입력해주세요',
          pattern: {
            value: emailPattern,
            message: '올바른 이메일 형식을 입력해주세요'
          }
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type="email"
            placeholder="이메일"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
            inputProps={{
              'aria-label': '이메일 입력',
              'aria-describedby': fieldState.error ? 'email-error' : undefined,
              'aria-invalid': !!fieldState.error
            }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: touchedFields.email ? (fieldState.error ? '#fef2f2' : '#f0f9ff') : '#f9fafb',
                '& fieldset': {
                  borderColor: fieldState.error ? '#ef4444' : (touchedFields.email && !fieldState.error ? '#10b981' : '#e5e7eb')
                },
                '&:hover fieldset': {
                  borderColor: fieldState.error ? '#ef4444' : '#667eea'
                },
                '&.Mui-focused fieldset': {
                  borderColor: fieldState.error ? '#ef4444' : '#667eea'
                }
              },
              '& .MuiFormHelperText-root': {
                fontWeight: 500,
                color: fieldState.error ? '#ef4444' : '#10b981'
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: fieldState.error ? '#ef4444' : (touchedFields.email && !fieldState.error ? '#10b981' : '#6b7280') }} />
                </InputAdornment>
              )
            }}
          />
        )}
      />

      {/* Password Field */}
      <Controller
        name="password"
        control={control}
        rules={{
          required: '비밀번호를 입력해주세요',
          validate: validatePassword
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
            inputProps={{
              'aria-label': '비밀번호 입력',
              'aria-describedby': fieldState.error ? 'password-error' : undefined,
              'aria-invalid': !!fieldState.error
            }}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: touchedFields.password ? (fieldState.error ? '#fef2f2' : '#f0f9ff') : '#f9fafb',
                '& fieldset': {
                  borderColor: fieldState.error ? '#ef4444' : (touchedFields.password && !fieldState.error ? '#10b981' : '#e5e7eb')
                },
                '&:hover fieldset': {
                  borderColor: fieldState.error ? '#ef4444' : '#667eea'
                },
                '&.Mui-focused fieldset': {
                  borderColor: fieldState.error ? '#ef4444' : '#667eea'
                }
              },
              '& .MuiFormHelperText-root': {
                fontWeight: 500,
                color: fieldState.error ? '#ef4444' : '#10b981'
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: fieldState.error ? '#ef4444' : (touchedFields.password && !fieldState.error ? '#10b981' : '#6b7280') }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: '#6b7280' }}
                    aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        )}
      />

      {/* Login Button */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading || !isValid}
        sx={{
          py: 1.5,
          mb: 2,
          borderRadius: 2,
          background: (loading || !isValid) ? '#d1d5db' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontWeight: 600,
          fontSize: 16,
          textTransform: 'none',
          boxShadow: (loading || !isValid) ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.4)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            background: (loading || !isValid) ? '#d1d5db' : 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
            boxShadow: (loading || !isValid) ? 'none' : '0 6px 16px rgba(102, 126, 234, 0.6)'
          },
          '&:disabled': {
            background: '#d1d5db',
            boxShadow: 'none',
            color: '#9ca3af'
          }
        }}
        aria-label="로그인 버튼"
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : '로그인'}
      </Button>

      {/* Forgot Password */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography
          variant="body2"
          sx={{
            color: '#667eea',
            cursor: 'pointer',
            fontWeight: 500,
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          비밀번호를 잊으셨나요?
        </Typography>
      </Box>

      {/* Divider */}
      <Divider sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ color: '#6b7280', px: 2 }}>
          또는
        </Typography>
      </Divider>

      {/* Social Login Buttons */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {/* Google Login */}
        <Button
          onClick={handleGoogleLogin}
          variant="outlined"
          fullWidth
          disabled={loading}
          sx={{
            py: 1.5,
            borderRadius: 2,
            borderColor: '#e5e7eb',
            color: '#374151',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              borderColor: '#667eea',
              bgcolor: '#f8f9ff'
            }
          }}
          startIcon={<Google />}
        >
          Google로 로그인
        </Button>

        {/* Kakao Login */}
        <Button
          onClick={handleKakaoLogin}
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            py: 1.5,
            borderRadius: 2,
            bgcolor: '#FEE500',
            color: '#000000',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#FDD835'
            },
            '&:disabled': {
              bgcolor: '#d1d5db',
              color: '#6b7280'
            }
          }}
          startIcon={
            <Box sx={{ 
              width: 20, 
              height: 20, 
              borderRadius: '50%',
              bgcolor: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 'bold',
              color: '#FEE500'
            }}>
              K
            </Box>
          }
        >
          Kakao로 로그인
        </Button>
      </Box>
    </Box>
  )
}

export default LoginForm